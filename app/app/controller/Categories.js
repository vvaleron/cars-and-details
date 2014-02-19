Ext.define('MD.controller.Categories', {
    extend: 'Ext.app.Controller',
    init: function() {
        var me = this;

        me.control({
            'LeftPanel': {
                'createNewCategory':me.createNew,
                'changeCategory':me.changeCategory,
                'deleteCategory':me.deleteCategory,
                'change': me.change
            }
        });

    },
    centerPanel : {
        activeCategoryId : null,
        getPanel : function(){return Ext.getCmp('centerPanel')},
        getActiveTab : function(){
           return this.getPanel().getActiveTab();
        },
        getCategoryInfo:function(_id){
            console.log(_id);
        },
        changeTitle:function(title){
            this.getActiveTab().setTitle(title);
        },
        removeActiveItems:function(){
            this.getActiveTab().removeAll();
        },
        setActiveItems:function(_id){
            this.removeActiveItems();
            this.activeCategoryId = _id;
            console.log(_id)
        },
        getMongoById:function(_id){
            Ext.Ajax.request({
                url: '/categories/'+_id,
                method:'GET',
                success: function(response){
                    var text = response.responseText;
                    console.log(text);
                    // process server response here
                }
            });
        }
    },

    createNew:function(form,window){
        form.getForm().submit({
            url             : '/categories',
            params          : form.getValues().name,
            success: function(form, action) {
                var result = Ext.JSON.decode(action.response.responseText);
                console.log(result);
                Ext.getStore('Categories').reload();
                window.close();
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        //                            console.log('Failure', 'CLIENT_INVALID');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        //                            console.log('Failure', 'AJAX CONNECT_INVALID');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                    //                            console.log('Failure', 'SERVER_INVALID', action.result.msg);
                }
            }
        })
    },

    changeCategory:function(form,window){
        var me = this,
            _id = me.centerPanel.activeCategoryId;
        form.getForm().submit({
            url             : '/categories/'+_id,
            method          : 'PUT',
            params          : form.getValues(),
            success: function(form, action) {
                var result = Ext.JSON.decode(action.response.responseText);
                console.log(result);
                Ext.getStore('Categories').reload();
                window.close();
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        //                            console.log('Failure', 'CLIENT_INVALID');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        //                            console.log('Failure', 'AJAX CONNECT_INVALID');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                    //                            console.log('Failure', 'SERVER_INVALID', action.result.msg);
                }
            }
        })
    },
    deleteCategory : function(window){
        var me = this,
            _id = me.centerPanel.activeCategoryId;
        console.log(_id);

        Ext.Ajax.request({
            url: '/categories/'+_id,
            method: 'DELETE',
            success: function(response){
                var text = response.responseText;
                console.log(text);

                Ext.getStore('Categories').reload();
                window.close();
            }
        });
    },
    change : function(grid,rec){
        var me = this;
        me.centerPanel.changeTitle(rec.getData().name);
        me.centerPanel.setActiveItems(rec.getData()._id);
//        me.centerPanel.getMongoById(rec.getData()._id);
        //debugger;
    }
 });