const state = function() {
    let token = "";

    return {
        token: function() {
            return {
                get: function() {
                    return token;
                },
                change: function(newVal) {
                    token = newVal;
                }
            }
        }
    }
}

module.exports = state();