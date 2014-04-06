Ext.define('MD.view.mainScreen.itemsTools.ItemsImages', {
    extend : 'Ext.Img',
    autoEl: 'div',
    initComponent:function(){

        Ext.apply(this,{
            width: 100,
            height:100,

            listeners:{
                afterrender:function(image){
                    debugger;
                }
            }
        });
        this.callParent(arguments);
    }
});