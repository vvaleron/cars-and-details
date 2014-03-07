Ext.define('MD.view.mainScreen.CenterPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.CenterPanel',

    initComponent:function(){
        var me = this;

        me.loginForm = Ext.create('MD.view.Authorization.LoginForm',{}).show();

        Ext.apply(this,{
            activeTab: 0,      // First tab active by default
            items: [],
            //title:'Деталі машин',
            title:false,
            id:'centerPanel',
            cls: 'center-panel',
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
    }
});
