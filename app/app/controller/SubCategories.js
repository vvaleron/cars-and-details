Ext.define('MD.controller.SubCategories', {
    extend: 'Ext.app.Controller',
    init: function() {
        var me = this;

        me.control({
            'SubCategories': {
                'createNewSubCat':me.createNewSubCat
            }
        });
    },

    subCategoryStore : function(){return Ext.getStore('SubCategories')},

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
