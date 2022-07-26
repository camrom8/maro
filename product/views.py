import six
from django.db.models import Q
from django.shortcuts import render
from django.views.generic import CreateView, DetailView

# def query_debugger(func):
#     @functools.wraps(func)
#     def inner_func(*args, **kwargs):
#         reset_queries()
#
#         start_queries = len(connection.queries)
#
#         start = time.perf_counter()
#         result = func(*args, **kwargs)
#         end = time.perf_counter()
#
#         end_queries = len(connection.queries)
#
#         print(f"Function : {func.__name__}")
#         print(f"Number of Queries : {end_queries - start_queries}")
#         print(f"Finished in : {(end - start):.2f}s")
#         return result
#     return inner_func


# @query_debugger
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from product.models import Item
from product.serializers import ItemSerializer


class ItemCreateView(CreateView):
    model = Item
    template_name_suffix ='_create_form'
    fields = ['name', 'price', 'description', 'expiration_date']


class ItemDetailView(DetailView):
    model = Item


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 2


class ItemListViewSet(ReadOnlyModelViewSet, ListAPIView):

    serializer_class = ItemSerializer
    pagination_class = SmallResultsSetPagination
    queryset = Item.objects.all()

    default_order_by = ('id', 'name',)

    valid_query_parameters = ('name',)

    excluded_filtering_parameters = ()

    multi_select_parameters = ()

    search_vector_lookups = ()

    annotations = {}

    @action(detail=False)
    def count(self, request):
        return Response(data={'results': self.get_queryset().count()})

    def get_base_queryset(self):
        return Item.objects.all()

    # def get_queryset(self):
    #     return super().get_queryset().order_by(
    #         *self.default_order_by
    #     )
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = super().get_queryset()
        query = self.request.query_params.get('q')
        if query is not None:
            queryset = queryset.filter(
                Q(name__icontains=query)|
                Q(description__icontains=query)|
                Q(price__icontains=query)
            ).distinct()
        return queryset

    def filter_queryset(self, queryset):
        # Apply filter backends
        queryset = super().filter_queryset(queryset)

        params = self.process_query_parameters()

        queryset = queryset.filter(*self.get_filter_args(params))

        # Delete excluded params
        for e in self.excluded_filtering_parameters:
            if e in params:
                del params[e]
        return queryset.filter(**self.get_filter_kwargs(params))

    def get_filter_args(self, params):
        # Hook into queryset's filter *args
        return []

    def get_filter_kwargs(self, params):
        # Hook into queryset's filter **kwargs
        return params

    def process_query_parameters(self):
        # Any mutation of query parameters should be done here
        return self.get_query_parameters()

    def get_query_parameters(self):
        # Returns a dictionary of valid query params
        # excluding any params in the exclusion collection
        params = {}
        for k, v in six.iteritems(self.request.GET):
            if k in self.valid_query_parameters:
                # Handle multiple select filters here
                if k in self.multi_select_parameters:
                    params[f'{k}__in'] = v.split(',')
                else:
                    params[k] = v
        return params

