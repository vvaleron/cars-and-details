Ext.define('MD.store.Users', {
    extend: 'Ext.data.Store',
    requires: 'MD.model.Users',
    model: 'MD.model.Users',
    proxy:{
        type:'ajax',
        url:'http://localhost:1337/users/',
        reader:{
            type:'json'
        }
    },
    autoLoad:true
});