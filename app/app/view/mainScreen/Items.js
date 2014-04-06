Ext.define('MD.view.mainScreen.Items',{
    extend:'Ext.grid.Panel',
    alias: 'widget.Items',

    initComponent:function(){
        var me = this;

        me.store = Ext.getStore("Items");

        me.changeMenu = Ext.create('MD.view.mainScreen.itemsTools.ChangeMenu');

        me.imageComponent = Ext.create('MD.view.mainScreen.itemsTools.ItemsImages', {
            listeners:{
                afterrender: function(){
                    debugger
                }
            },
            handler: function (grid, rowIndex, colIndex) {
                debugger
            }
        });

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
                    me.changeMenu.show();
                }
            }
        ];

        Ext.apply(this,{
            height:500,
            flex:1,
            viewConfig: {
                stripeRows: false
            },

            autoScroll:true,
            id:'items',
            cls:'items-grid',
            columns :[
                {
                    xtype:'actioncolumn',
                    dataIndex: 'imageUrl',
                    width:140,
                    menuDisabled:true,
                    sortable:false,
                    listeners:{
                        click:function(gridView, td, index, x, e, record){
                            var el = Ext.get(e.target),
                                isEmpty = !record.getData().imageUrl;

                            if(isEmpty){
                                alert("Додати?")
                            }
                            else {
                                alert("Змінити")
                            }
                        }
                    },
                    renderer:function(url, metaData, record, rowIndex, colIndex){
                        var attrs;
                        if(url){
                            var id = "id=item-icon-" + record.getData()._id;
                            attrs =id+' src='+url;
                            return '<img class="items-icon-cls " '+attrs+'>';
                        }
                        else{
                            return '<div class="items-icon-cls no-item">+</div>';
                        }

                    }
                },
                {
                    xtype:'actioncolumn',
                    dataIndex: 'name',
                    header:'Деталі',
                    menuDisabled:true,
                    sortable:false,
                    flex:1,
                    margin:"0 0 0 0",
                    renderer:function(value, metaData, record, rowIndex, colIndex){
                        return '<div class="items-name-value" style="font-size:16px; text-align: center;padding: 10px 5px;">'+value+'</div>';
                    },
                    listeners:{
                        focus: function(column, The, eOpts){
                            console.log(column, The, eOpts)
                        }
                    }
                },{
                    //todo: renderer
                    xtype:'actioncolumn',
                    dataIndex: '_id',
                    menuDisabled:true,
                    sortable:false,
                    width:70,
                    margin:"0 0 0 0",
                    renderer:function(value, metaData, record, rowIndex, colIndex){
                        return '<div id="change-column-' + value + '" class="change-items-wrap">Змінити</div>';
                    }
                }
            ],
            listeners : {
                itemclick : function( gridView, record, td, index, e, eOpts ){
                    me.fireEvent('setActiveItem',me,record);
                },
                afterrender:function(grid){
                    grid.getView().getEl().applyStyles("overflow-x:hidden;overflow-y:scroll;");
                }
            }
        });

        this.callParent(arguments);
    }
});