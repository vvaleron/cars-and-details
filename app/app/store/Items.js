Ext.define('MD.store.Items', {
    extend: 'Ext.data.Store',
    requires: 'MD.model.Items',
    model: 'MD.model.Items',
    proxy:{
        type:'ajax',
        url:'http://localhost:1337/items',
        reader:{
            type:'json'
        }
    },
    autoLoad:true,


    listeners:{
        load: function( store, meta, eOpts ){
        }
    },
    byCategory: function(catId){
        this.filter('categoryId',catId);
    },
    bySubCategory: function(subId){
        this.filter('subCategoryId',subId);
    }
});