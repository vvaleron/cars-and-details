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
    },
    updateProxy:function(){
        var categoryId      = MD.activeCategoryId,
            subCategoryId   = MD.activeSubCategoryId,
            url = Ext.isEmpty(subCategoryId) ? categoryId : categoryId +"/"+ subCategoryId;

        var newProxy = {
            type:'ajax',
            url:'http://localhost:1337/items/' + url,
            reader:
                {
                    type:'json'
                }
            };

        console.log(categoryId,     '---------------- CATEGORIES');
        console.log(subCategoryId,  '-------------SUB CATEGORIES');
        console.log('http://localhost:1337/items/' + url, '-------------URL');

        this.setProxy(newProxy);
    }
});