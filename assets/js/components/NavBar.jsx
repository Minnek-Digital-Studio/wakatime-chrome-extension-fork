var React = require('react');
var reactCreateClass = require('create-react-class');

var NavBar = reactCreateClass({
  render: function () {
    var that = this;

    var signedInAs = function () {
      if (that.props.loggedIn === true) {
        return (
          <div className="profile navbar-text">
            <img
              class="profile-image"
              src={
                'https://ui-avatars.com/api/?name=' +
                that.props.user.full_name.replace(' ', '+') +
                '&background=0D8ABC&color=fff'
              }
              alt={that.props.user.full_name}
            />
            <div class="profile-content">
              <p>
                <b>{that.props.user.full_name}</b>
              </p>
              <p>{that.props.user.email}</p>
            </div>
          </div>
        );
      }
    };

    var dashboard = function () {
      if (that.props.loggedIn === true) {
        return (
          <li>
            <a target="_blank" href="https://wakatime.com/dashboard">
              <i className="fa fa-fw fa-tachometer"></i>
              Dashboard
            </a>
          </li>
        );
      }
    };

    var customRules = function () {
      if (that.props.loggedIn === true) {
        return (
          <li>
            <a target="_blank" href="https://wakatime.com/settings/rules">
              <i className="fa fa-fw fa-filter"></i>
              Custom Rules
            </a>
          </li>
        );
      }
    };

    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <i className="fa fa-fw fa-cogs"></i>
            </button>
            <a target="_blank" className="navbar-brand" href="https://wakatime.com">
              WakaTime
              <img src="graphics/wakatime-logo-48.png" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {signedInAs()}
            <ul className="nav navbar-nav profile-nav">
              {customRules()}
              {dashboard()}
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  <i className="fa fa-fw fa-info"></i>
                  About
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li>
                    <a target="_blank" href="https://github.com/wakatime/chrome-wakatime/issues">
                      <i className="fa fa-fw fa-bug"></i>
                      Report an Issue
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/wakatime/chrome-wakatime">
                      <i className="fa fa-fw fa-github"></i>
                      View on GitHub
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  },
});

module.exports = NavBar;
