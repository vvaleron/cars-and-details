Ext.define('MD.view.mainScreen.SubCategories',{
    extend:'Ext.grid.Panel',
    alias: 'widget.SubCategories',

    initComponent:function(){
        var me = this;

        me.store = Ext.getStore("SubCategories");



        me.createSubCat = Ext.create('Ext.menu.Menu', {
            closeAction:'hide',
            items: [{
                xtype:'form',
                title:'Додати підкатегорію',
                titleAlign:'center',
                frame:true,
                width: 200,
                bodyPadding: 10,
                defaultType: 'textfield',
                items:[{
                    //value:'igorOliynik',
                    width:'100%',
                    allowBlank: false,
                    fieldLabel: 'Назва',
                    name: 'name',
                    emptyText: 'Введіть назву підкатегорії'
                }],
                bbar:[{
                    xtype:'button',
                    text:'Створити',
                    width:'100%',
                    handler:function(){
                        me.fireEvent('createNewSubCat', this.up('form'),me);
                    }
                }]
            }]
        });

        me.bbar = [
            {
                text:'Створити',
                handler:function(){
                    me.createSubCat.show();
                }
            },
            {
                text:'Змінити',
                handler:function(){

                }
            }
        ];

        Ext.apply(this,{
            viewConfig: {
                stripeRows: false
            },
            width:200,
            height:300,
            autoScroll:true,
            id:'sub_categories',
            columns :[
                {
                    xtype:'actioncolumn',
                    dataIndex: 'name',
                    header:'Під категорії',
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
                itemclick : function( grid, record, td, index, e, eOpts ){
                    me.fireEvent('selectSubCategories',me,record);
                    //storeActions.setSelected(record.getData()._id);
                },
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