Ext.define('MD.store.SubCategories', {
    extend: 'Ext.data.Store',
    requires: 'MD.model.SubCategories',
    model: 'MD.model.SubCategories',
    proxy:{
        type:'ajax',
        url:'http://localhost:1337/sub_categories',
        reader:{
            type:'json'
        }
    },
    autoLoad:true,
    listeners:{
        load:function(store, records){

        },
        metachange: function( store, meta, eOpts ){
            console.log(store);
            console.log(meta);
        }
    },
    categories: (function(){
        var selected;
        return {
            createNew: function(){

            },
            setSelected:function(id){
                selected = id;
            },
            getSelected:function(){
                return selected;
            },
            getAll : function(){

            }
        }
    }())
});