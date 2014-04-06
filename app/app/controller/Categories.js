Ext.define('MD.controller.Categories', {
    extend: 'Ext.app.Controller',
    requires: [
        'MD.store.Items'
    ],

    init: function() {
        var me = this;

        me.control({
            'LeftPanel': {
                'createNewCategory':me.createNew,
                'changeCategory':me.changeCategory,
                'deleteCategory':me.deleteCategory,
                'change': me.change
            },
            'Items':{
                "createNewItem":me.createItem
            }
        });
    },
    centerPanel : {
        getPanel : function(){return Ext.getCmp('centerPanel')},
        createItems:function(){return this.getPanel().createItems()},

        setActiveItems:function(_id){
            _id ? MD.activeCategoryId = _id : null;
        },
        tabs:[],
        isExist:function(_id){
            return this.tabs.indexOf(_id) != -1;
        }
    },
    createItem:function(form,win){
        var me = this, params ={};
            params.name = form.getValues().name;
            params.categoryId = MD.activeCategoryId;

        if(!Ext.isEmpty(MD.activeSubCategoryId)) {
            params.subCategoryId = MD.activeSubCategoryId
        } else{
            params.subCategoryId=null;
        }
        form.getForm().submit({
            url             : '/items',
            params          : params,
            success: function(form, action) {
                var result = Ext.JSON.decode(action.response.responseText),
                    store = Ext.getStore('Items');

                store.isLoading() ? store.reload() : store.load();
                form.owner.up('panel').close();
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
    clearActiveSubCategories:function(){
        var index = Ext.getStore("SubCategories").find('_id',MD.activeSubCategoryId);
        Ext.getCmp('sub_categories').getView().deselect(index);
        MD.activeSubCategoryId=null;
    },
    filterSubCategories: function(){
        var store = Ext.getStore("SubCategories");
        if(store.isFiltered()){
            store.clearFilter();
        }
        store.filter({property:'parent',value:MD.activeCategoryId});
    },

    //filter items by category
    FIByCategory: function(id){
        var store = Ext.getStore('Items');
        store.clearFilter();
        store.byCategory(id);
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
            _id = MD.activeCategoryId;
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
            _id = MD.activeCategoryId;
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
        var me = this,
            id = rec.getData()._id;
        me.centerPanel.setActiveItems(id);
        me.FIByCategory(id);

        me.clearActiveSubCategories();
        me.filterSubCategories();
    }
 });