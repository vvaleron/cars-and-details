Ext.define('MD.controller.Users', {
    extend: 'Ext.app.Controller',
    init: function() {
        var me = this;

        me.control({
            'loginForm': {
                userConfig: me.userForms
            }
        });

    },

    userForms : function(userForm){

        var user =  {};
            user.values       = userForm.getValues();
            user.store        = Ext.getStore('Users');
            user.storeId      = user.store.find('login', user.values.login);
            user.isExist      = function(){ return user.storeId != -1 };
            user.record       = null;
            user._id          = null;


        var loginUser = function(){

            user.record       = user.store.getAt(user.storeId);
            user._id          = user.record.data['_id'];

            var loginParams = {
                    url             : '/login-user',
                    params          : { _id : user._id },
                    success: function(form, action) {
                        var result = Ext.JSON.decode(action.response.responseText);
                        result.user.loginSuccess = true;
                        result.user.currentUser = true;
                        user.record.set(result.user);
                        user.store.user.setCurrent(result.user);

                        userForm.close();
                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
    //                            console.log('Failure', 'CLIENT_INVALID');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
    //                            console.log('Failure', 'AJAX CONNECT_INVALID');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
    //                            console.log('Failure', 'SERVER_INVALID', action.result.msg);
                        }
                    }
            };
            return userForm.getForm().submit(loginParams);
        };

        var loginFailMassage = function(){
            userForm.loginFailMassage();
            console.log('start newUser()');
        };

        if(user.isExist()){
            loginUser();
        }
        else{
            loginFailMassage();
        }
    }
});