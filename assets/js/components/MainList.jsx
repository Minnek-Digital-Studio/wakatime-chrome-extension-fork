/* global browser */

var React = require('react');
var reactCreateClass = require('create-react-class');
var MainList = reactCreateClass({
  _openOptionsPage: function () {
    if (browser.runtime.openOptionsPage) {
      // New way to open options pages, if supported (Chrome 42+).
      browser.runtime.openOptionsPage();
    } else {
      // Reasonable fallback.
      window.open(browser.runtime.getURL('options.html'));
    }
  },

  render: function () {
    var that = this;

    var signedInAs = function () {
      if (that.props.loggedIn === true) {
        var projectName = that.props.user.lastProjectName;
        var projectNameLength = projectName.length;

        if (projectNameLength > 20) {
          projectName = projectName.substring(0, 20) + '...';
        } else {
          projectName = projectName;
        }
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                <span>
                  {that.props.user.full_name}{' '}
                  {that.props.user.hasPremium === true && (
                    <span className="label label-success">Premium</span>
                  )}
                </span>

                <a href="#" onClick={that._openOptionsPage}>
                  <i className="fa fa-fw fa-cog"></i>
                  Options
                </a>
              </h3>
            </div>
            <div className="panel-body">
              <div className="media">
                <div className="media-left">
                  <img
                    className="media-object"
                    src={
                      'https://ui-avatars.com/api/?name=' +
                      that.props.user.full_name.replace(' ', '+') +
                      '&background=0D8ABC&color=fff'
                    }
                    alt={that.props.user.full_name}
                  />
                </div>
                <div className="media-body">
                  <p className="media-text">{that.props.user.email}</p>
                  <h5 className="media-heading m-top">Last Logged</h5>
                  <p className="media-text">{that.props.user.lastLoggedTime}</p>
                  <p className="media-text">Plugin: {that.props.user.lastPluginName}</p>
                  <p className="media-text" title={that.props.user.lastProjectName}>
                    Project: {projectName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    var loginLogoutButton = function () {
      if (that.props.loggedIn === true) {
        return (
          <div>
            <a href="#" className="list-group-item" onClick={that.props.logoutUser}>
              <i className="fa fa-fw fa-sign-out"></i>
              Logout
            </a>
          </div>
        );
      }

      return (
        <a target="_blank" href="https://wakatime.com/login" className="list-group-item">
          <i className="fa fa-fw fa-sign-in"></i>
          Login
        </a>
      );
    };

    // If logging is enabled, display that info to user
    var loggingStatus = function () {
      if (that.props.loggingEnabled === true && that.props.loggedIn === true) {
        return (
          <div className="row">
            <div className="col-xs-12">
              <p>
                <a
                  href="#"
                  onClick={that.props.disableLogging}
                  className="btn btn-danger btn-block"
                >
                  Disable time tracking
                </a>
              </p>
            </div>
          </div>
        );
      } else if (that.props.loggingEnabled === false && that.props.loggedIn === true) {
        return (
          <div className="row">
            <div className="col-xs-12">
              <p>
                <a
                  href="#"
                  onClick={that.props.enableLogging}
                  className="btn btn-success btn-block"
                >
                  Enable time tracking
                </a>
              </p>
            </div>
          </div>
        );
      }
    };

    var totalTimeLoggedToday = function () {
      if (that.props.loggedIn === true) {
        return (
          <div className="row">
            <div className="col-xs-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Total Time Logged Today</h3>
                </div>
                <div className="panel-body">
                  {that.props.totalTimeLoggedToday} on {that.props.totalProjectsToday} projects
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div>
        {signedInAs()}

        {totalTimeLoggedToday()}

        {loggingStatus()}

        <div className="list-group profile-list">{loginLogoutButton()}</div>
      </div>
    );
  },
});

module.exports = MainList;
