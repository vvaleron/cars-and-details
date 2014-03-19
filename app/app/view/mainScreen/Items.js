Ext.define('MD.view.mainScreen.Items',{
    extend:'Ext.grid.Panel',
    alias: 'widget.Items',

    initComponent:function(){
        var me = this;

        me.store = Ext.getStore("Items");



        me.createItem = Ext.create('Ext.menu.Menu', {
            closeAction:'hide',
            items: [{
                xtype:'form',
                title:'Додати деталь',
                titleAlign:'center',
                frame:true,
                width: '100%',
                bodyPadding: 10,
                defaultType: 'textfield',
                items:[{
                    //value:'igorOliynik',
                    width:'100%',
                    allowBlank: false,
                    fieldLabel: 'Назва',
                    name: 'name',
                    emptyText: 'Введіть назву деталі'
                }],
                bbar:[{
                    xtype:'button',
                    text:'Створити',
                    width:'100%',
                    handler:function(){
                        me.fireEvent('createNewItem', this.up('form'),me);
                    }
                }]
            }]
        });

        me.bbar = [
            {
                text:'Створити',
                handler:function(){
                    me.createItem.show();
                }
            },
            {
                text:'Змінити',
                handler:function(){

                }
            }
        ];

        Ext.apply(this,{
            height:300,
            flex:1,
            viewConfig: {
                stripeRows: false
            },

            autoScroll:true,
            id:'items'+MD.activeCategoryId,
            columns :[
                {
                    xtype:'actioncolumn',
                    dataIndex: 'name',
                    header:'Деталі',
                    menuDisabled:true,
                    sortable:false,
                    flex:1,
                    margin:"0 0 0 0",
                    renderer:function(value){
                        return '<div style="font-size:16px; text-align: center;padding: 10px 20px;">'+value+'</div>';
                    }
                }
            ],
            listeners : {
//                itemclick : function( grid, record, td, index, e, eOpts ){
//                    me.fireEvent('',me,record);
//                    //storeActions.setSelected(record.getData()._id);
//                }
                afterrender:function(grid){
                    grid.getView().getEl().applyStyles("overflow-x:hidden;overflow-y:scroll;");
//                    var height = grid.up("#centerPanel").body.getHeight();
//                    grid.setHeight(height);
                }
            }
        });

        this.callParent(arguments);
    }
});