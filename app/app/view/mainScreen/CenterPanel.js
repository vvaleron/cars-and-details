Ext.define('MD.view.mainScreen.CenterPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.CenterPanel',

    initComponent:function(){
        var me = this;

        me.loginForm = Ext.create('MD.view.Authorization.LoginForm',{}).show();

        Ext.apply(this,{
            //title:'Деталі машин',
            title:false,
            id:'centerPanel',
            cls: 'center-panel',
            activeTab: 0,      // First tab active by default
            items: [
            {
                itemId: "first",
                title: 'Авторизація',
                items: [
//                    me.loginForm
                ],
                listeners:{
                    afterrender : function(item){
//                        console.log(item);
                    }
                }
            }],
            listeners:{
                afterrender:function(panel){
//                    console.log('center panel');
                }
            }
        });
        this.callParent(arguments);
    }
});
