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
    autoLoad:true,
    listeners:{
        load:function(store, records){
            store.user.getCurrent();
        }
    },
    user: (function(){
        var previousUser, currentUser, currentRecord;

        return {
            setCurrentRecord: function(id){
                var store = Ext.getStore('Users');
                    currentRecord = store.findRecord('_id', id);
                return currentRecord;
            },
            setCurrent: function(){
                var args = arguments, id, record;

                for(var i = 0; i < args.length; ++i){
                    if(typeof args[i]=="string"){
                        id = args[i];
                    }
                    else if(typeof args[i]=="object"){
                        record = args[i];
                        id = record._id;
                    }
                }

                previousUser = currentUser;
                currentUser = id;
                this.setCurrentRecord(id);
            },
            getPrevious : function(){
                return previousUser;
            },
            getCurrentRecord: function(){
                return currentRecord;
            },
            getCurrent: function(){
                return currentUser;
            }
        }
    }())
});