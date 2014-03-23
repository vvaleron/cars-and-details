Ext.application({
	name:'MD',
	autoCreateViewport:true,
	models		:[
        'Users',
        'Categories',
        'SubCategories',
        'Items'
    ],
	stores 		:[
        'Users',
        'Categories',
        'SubCategories',
        'Items'
    ],
	controllers	:[
        'MD',
        'Users',
        'Categories',
        'SubCategories',
        'Items'
    ],
	views		: ['Viewport'],
	launch:function(){
		var me = this;
        MD.users = Ext.getStore('Users').user;
    }
});
