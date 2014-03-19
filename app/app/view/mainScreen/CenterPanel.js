Ext.define('MD.view.mainScreen.CenterPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.CenterPanel',

    initComponent:function(){
        var me = this;

        me.loginForm = Ext.create('MD.view.Authorization.LoginForm',{}).show();

        me.subCatGrid = Ext.create('MD.view.mainScreen.SubCategories',{}).show();

        me.itemsGrid = Ext.create('MD.view.mainScreen.Items',{}).show();

        Ext.apply(this,{
            items: [
                me.subCatGrid,
                me.itemsGrid
            ],
            //title:'Деталі машин',
            title:false,
            id:'centerPanel',
            cls: 'center-panel',
            layout:'hbox',
            defaults:{
                layout:'hbox'
            },
            listeners:{
                afterrender:function(panel){
//                    console.log('center panel');
                },
                tabchange:function(tabPanel, newCard, oldCard){
                    var NewCard_id = newCard.id.slice(3);
                    this.fireEvent('tab_change',this,NewCard_id);

                }
            }
        });
        this.callParent(arguments);
    },
    createSubCategories: function(){
        return Ext.create('MD.view.mainScreen.SubCategories',{}).show();
    },
    createItems:function(){
        return Ext.create('MD.view.mainScreen.Items',{}).show();
    }
});
