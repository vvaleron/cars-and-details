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
                width: 330,
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
            width:150,
            autoScroll:true,
            id:'sub_categories'+MD.activeCategoryId,
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
//            listeners : {
//                itemclick : function( grid, record, td, index, e, eOpts ){
//                    me.fireEvent('',me,record);
//                    //storeActions.setSelected(record.getData()._id);
//                }
//            }
        });

        this.callParent(arguments);
    }
});