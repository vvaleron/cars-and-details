Ext.define('MD.store.Categories', {
    extend: 'Ext.data.Store',
    requires: 'MD.model.Categories',
    model: 'MD.model.Categories',
    proxy:{
        type:'ajax',
        url:'http://localhost:1337/categ',
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