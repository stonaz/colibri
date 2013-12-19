from rest_framework import serializers


from .models import Book



class BookListSerializer(serializers.ModelSerializer):
    """
    Book list
    """
    #categoria = serializers.Field(source='categoria.nome')
    #nodes = serializers.HyperlinkedIdentityField(view_name='api_layer_nodes_list', slug_field='slug')
    #geojson = serializers.HyperlinkedIdentityField(view_name='api_layer_nodes_geojson', slug_field='slug')
    
    class Meta:
        model = Book

        #fields= (
        #   'categoria','nome', 'difficulty','costo','time','image','details',
        #    )