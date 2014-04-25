Ext.define('MD.view.mainScreen.Items',{
    extend:'Ext.grid.Panel',
    alias: 'widget.Items',

    initComponent:function(){
        var me = this;

        me.store = Ext.getStore("Items");

        me.changeMenu = Ext.create('MD.view.mainScreen.itemsTools.ChangeMenu');

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

        me.showDetailsLink = function(id){
            var el = Ext.get("change-column-"+id);
            el.applyStyles("display:block;");
            el.animate({to:{opacity:1}});
        };

        me.hideDetailsLink = function(id){
            var el = Ext.get("change-column-"+id);
            el.applyStyles("display:none; opacity:0;");
        };

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

        me.columns = [
            {
                xtype:'actioncolumn',
                dataIndex: 'imageUrl',
                width:75,
                menuDisabled:true,
                sortable:false,
                listeners:{
                    click:function(gridView, td, index, x, e, record){
                        var  url = record.getData().imageUrl,
                            imageWidth = record.getData().imageWidth,
                            imageHeight = record.getData().imageHeight;

                        if(!url){
                            Ext.Msg.show({
                                title:'Додати фото',
                                msg: 'Додати фотографію ?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function(yesOrNo, u, obj){
                                    if(yesOrNo=="yes"){
                                        me.changeMenu.addPhotoWindow.show();
                                    }
                                }
                            });
                        }
                        else{

                            Ext.create("Ext.window.Window",{
                                layout:{
                                    type:'vbox',
                                    align:'center'
                                },
                                bodyPadding: "10 10 0 10",
                                padding: 5,
                                items:[
                                    {
                                        xtype: 'component',
                                        itemId:'img',
                                        width: imageWidth,
                                        height: imageHeight,
                                        style:'border-radius: 4px;',
                                        autoEl: {
                                            tag: 'img',
                                            src: url
                                        }
                                    },
                                    {
                                        xtype:"button",
                                        text:"Змінити",
                                        margin:'10 0'
                                    }
                                ]
                            }).show();
                        }
                    }
                },
                renderer:function(url, metaData, record, rowIndex, colIndex){
                    var attrs,
                        id = "id=item-icon-" + record.getData()._id;
                    if(url){
                        attrs =id+' src='+url;
                        return '<img class="items-icon-cls " '+attrs+'>';
                    }
                    else{
                        return '<div class="items-icon-cls no-item" ' + id + '>+</div>';
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
                    return '<div class="items-name-value">'+value+'</div>';
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
                padding:"0 24 0 0",
                renderer:function(value, metaData, record, rowIndex, colIndex){
                    return '<div id="change-column-' + value + '" class="change-items-wrap" style="display:none;opacity:0;">Детально</div>';
                },
                listeners:{
                    click: function(gridView, td, index, x, e, record){
                        me.fireEvent('showDetails',record,td);
                    }
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
            listeners : {
                itemclick : function( gridView, record, td, index, e, eOpts ){
                    me.fireEvent('setActiveItem',me,record);
                    me.showDetailsLink(record.getData()._id);
                },
                deselect : function( gridView, record){
                    me.hideDetailsLink(record.getData()._id);
                    me.fireEvent("hideDetails", record);
                },
                afterrender:function(grid){
                    grid.getView().getEl().applyStyles("overflow-x:hidden;overflow-y:scroll;");
                }
            }
        });

        this.callParent(arguments);
    }
});