Ext.define('MD.store.Categories', {
    extend: 'Ext.data.Store',
    requires: 'MD.model.Categories',
    model: 'MD.model.Categories',
    proxy:{
        type:'ajax',
        url:'http://localhost:1337/categories',
        reader:{
            type:'json'
        }
    },
    autoLoad:true
});