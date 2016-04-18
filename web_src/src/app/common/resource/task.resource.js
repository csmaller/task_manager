

angular.module('app.common.resource').factory('Task', Task);

function Task($q, apiResource) {
    var actions = getTaskActions();
    var rx = apiResource('', {}, actions);

    return rx;

    function getTaskActions() {
        var list = {};
        list.getAllTask = {
            url: '',
            isArray: true,
            interceptor: {
                response: function(response) {

                    if (response.data.success === false) {
                        return $q.reject(response.data);
                    }

                    return response.data;
                }
            }
        };
       

        list.get = {

            url: "read_tasks.php",
            isArray: true,
            interceptor: {
                response: function(response) {

                    if (response.data.success === false) {
                        return $q.reject(response.data);
                    }

                    return response.data;
                }
            }

        };

        list.delete= {

            method: 'POST',
            url: 'delete_task.php',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        list.save = {
            url: 'create_task.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };


        return list;

    }

    



    function isNullResponse(response) {
        return !angular.isObject(response) || angular.isUndefined(response.house_id);
    }
}

