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
            },
            'CenterPanel':{
                "tab_change":me.tab_change
            }
        });
    },
    centerPanel : {
        getPanel : function(){return Ext.getCmp('centerPanel')},
        createSubCategories:function(){return this.getPanel().createSubCategories()},
        getCategoryInfo:function(_id){
            console.log(_id);
        },
        changeTitle:function(title){
            this.getPanel().getActiveTab().setTitle(title);
        },
//        removeActiveItems:function(){
//            this.getPanel().getActiveTab().removeAll();
//        },
        setActiveItems:function(_id){
            MD.activeCategoryId = _id;
            this.getPanel().setActiveTab('tab'+_id);
        },
        tabs:[],
        isExist:function(_id){
            return this.tabs.indexOf(_id) != -1;
        },
        createTab: function(data){
            if(! this.isExist(data._id)){
                this.tabs.push(MD.activeCategoryId);
                this.getPanel().add({
                    title:data.name,
                    id:'tab'+data._id,
                    items:[
                        this.createSubCategories()
                    ]
                });
            }
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
    selectGridItem: function(view,id){
        var array = Ext.getStore('Categories').data.items;

        array.forEach(function(item){
            if(item.data._id==id){
                view.select(item.index);
            }
        });

    },
    tab_change:function(panel,id){
        var categoryGrid = Ext.ComponentQuery.query('LeftPanel')[0];

        this.selectGridItem(categoryGrid.getView(),id)
    },
    change : function(grid,rec){
        var me = this;
        me.centerPanel.setActiveItems(rec.getData()._id);
        me.centerPanel.createTab(rec.getData());
    }
 });