function Preferences(i) {
    this.p = {
        'device':'tsl1128'
    }
    var db = new simpleDB('quantumTracking');
    var prefs = db.get(user.session.user.userId);
    if(!prefs) {
        thePrefs = $.extend({}, this.p, i);
    } else {
        thePrefs = $.extend({}, db.get(user.session.user.userId), i);
    }
    db.put(user.session.user.userId, thePrefs);
    return thePrefs;
}