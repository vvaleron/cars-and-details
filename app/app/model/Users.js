Ext.define('MD.model.Users', {
    extend: 'Ext.data.Model',
    fields: [
        '_id',
        'login',
        'password',
        'userType',
        'firstName',
        'secondName',
        'thirdName',
        'position',
        'mail',
        'phones',
        'description',
        'picture',
        'currentUser'
    ]
});