Ext.define('MD.view.mainScreen.itemsTools.ItemsImages', {
    extend : 'Ext.Img',
    autoEl: 'div',
    height: 200,
    width: 400,

    initComponent:function(){

        this.listeners = {
            afterrender: function(){
                debugger
            }
        };
        this.handler = function (grid, rowIndex, colIndex) {
            debugger
        };

        this.callParent(arguments);
    }
});