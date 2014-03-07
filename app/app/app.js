Ext.application({
	name:'MD',
	autoCreateViewport:true,
	models		:[
        'Users',
        'Categories',
        'SubCategories'
    ],
	stores 		:[
        'Users',
        'Categories',
        'SubCategories'
    ],
	controllers	:[
        'MD',
        'Users',
        'Categories',
        'SubCategories'
    ],
	views		: ['Viewport'],
	launch:function(){
		var me = this;
        MD.users = Ext.getStore('Users').user;
    }
});
