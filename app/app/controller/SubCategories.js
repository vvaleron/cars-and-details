Ext.define('MD.controller.SubCategories', {
    extend: 'Ext.app.Controller',
    init: function() {
        var me = this;

        me.control({
            'SubCategories': {
                'createNewSubCat':me.createNewSubCat,
                'selectSubCategories':me.selectSubCategories
            }
        });
    },

    updateItemsStore:function(){

//        store.updateProxy();
//        store.reload();
    },

    selectSubCategories:function(grid,record){
        var store = Ext.getStore("Items");

        MD.activeSubCategoryId = record.getData()._id;

        if(store.filters.length==2){
            store.clearFilter();
            store.byCategory(MD.activeCategoryId)
        }

        store.bySubCategory(MD.activeSubCategoryId);
    },

    updateGrid: function(){
        var view = Ext.getCmp('sub_categories'),
            store = Ext.getStore('SubCategories');
        store.reload();
    },

    createNewSubCat:function(form, buttonGroup){
        var me = this,
            params = {
                parent: MD.activeCategoryId,
                name : form.getValues().name
        };

        form.getForm().submit({
            url             : '/sub_categories',
            params          : params,
            success: function(form, action) {
                var result = Ext.JSON.decode(action.response.responseText);
                me.updateGrid();
                form.owner.up('menu').close();

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
        });
    }
});
