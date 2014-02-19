Ext.define('MD.view.mainScreen.leftPanel.LeftPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.LeftPanel',

    initComponent:function(){
        var me = this;
        me.store = 'Categories';

        me.addCategoryMenu = Ext.create('Ext.menu.Menu', {
            closeAction:'hide',
            items: [{
                xtype:'form',
                title:'Додати категорію',
                titleAlign:'center',
                frame:true,
                width: 330,
                bodyPadding: 10,
                defaultType: 'textfield',
                items:[{
                    //value:'igorOliynik',
                    width:'100%',
                    allowBlank: false,
                    fieldLabel: 'Назва',
                    name: 'name',
                    emptyText: 'Введіть назву категорії'
                }],
                bbar:[{
                    xtype:'button',
                    text:'Додати',
                    width:'100%',
                    handler:function(){
                        me.fireEvent('createNewCategory', this.up('form'),me.addCategoryMenu);
                    }
                }]
            }]
        });

        me.changeCategoryMenu = Ext.create('Ext.menu.Menu', {
            closeAction:'hide',
            items: [{
                xtype:'form',
                title:'Змінити категорію',
                titleAlign:'center',
                frame:true,
                width: 330,
                bodyPadding: 10,
                defaultType: 'textfield',
                items:[{
                    //value:'igorOliynik',
                    width:'100%',
                    allowBlank: false,
                    fieldLabel: 'Назва',
                    name: 'name',
                    emptyText: 'Введіть нову назву категорії'
                }],
                bbar:[{
                    xtype:'button',
                    text:'Змінити',
                    width:'100%',
                    handler:function(){
                        me.fireEvent('changeCategory', this.up('form'),me.changeCategoryMenu);
                    }
                }]
            }]
        });

        me.deleteCategoryMenu = Ext.create('Ext.menu.Menu', {
            closeAction:'hide',
            items: [{
                xtype:'form',
                title:'Видалити категорію',
                titleAlign:'center',
                frame:true,
                width: 430,
                bodyPadding: 10,
                defaultType: 'displayfield',
                items:[{
                    value:'Ви дійсно хочете видалити категорію?',
                    width:300
                }],
                bbar:[{
                    xtype:'button',
                    text:'так',
                    width:'50%',
                    handler:function(){
                        me.fireEvent('deleteCategory',me.deleteCategoryMenu);
                    }
                },{
                    xtype:'button',
                    text:'ні',
                    width:'50%',
                    handler:function(){
                        me.deleteCategoryMenu.close();
                    }
                }]
            }]
        });

        me.tools = [{
            type: 'plus',
            tooltip: 'Створити категорію',
            handler:function(event, toolEl, headerPanel){
                this.menu.show();
            },
            menu: me.addCategoryMenu
        },{
            type:'minus',
            tooltip: 'Видалити категорію',
            handler:function(event, toolEl, headerPanel){
                this.menu.show();
            },
            menu: me.deleteCategoryMenu
        },{
            type:'gear',
            tooltip: 'Змінити категорію',
            handler:function(event, toolEl, headerPanel){
                this.menu.show();
            },
            menu: me.changeCategoryMenu
        }];

        me.listeners = {
            itemclick : function( grid, record, td, index, e, eOpts ){
                me.fireEvent('change',me,record);
                //storeActions.setSelected(record.getData()._id);
            }
        };

        Ext.apply(this,{
            width: 200,
            title:'Категорії',
            collapsible: true,
            cls: 'left-panel',
            hideHeaders:true,
            viewConfig: {
                stripeRows: false
            },
            forceFit: true,
            columns :[
                {
                    xtype:'actioncolumn',
                    dataIndex: 'name',
//                    header:'Налаштування',
//                    menuDisabled:true,
//                    sortable:false,
                    flex:1,
                    renderer:function(value){
                        return '<div style="font-size:16px; text-align: center;padding: 10px 5px;">'+value+'</div>';
                    }
                }
            ]
        });

        this.callParent(arguments);
    }
});
