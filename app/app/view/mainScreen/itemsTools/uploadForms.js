Ext.define("MD.view.mainScreen.itemsTools.uploadForms", {
    extend:'Ext.form.Panel',

    header: false,
    width: 400,
    bodyPadding: 10,
    frame: false,
    items: [{
        xtype: 'filefield',
        name: 'photo',
        fieldLabel: 'Фото',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: 'Виберіть фото'
    }],

    buttons: [{
        text: 'Завантажити',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: '/upload/itemImage/'+MD.activeItemId,
                    waitMsg: 'Йде завантаження ...',
                    success: function(form, o) {
                        form.owner.up('window').close();
                        Ext.getStore("Items").reload();
                    }
                });
            }
        }
    }]
});