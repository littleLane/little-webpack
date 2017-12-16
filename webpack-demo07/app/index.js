import _ from 'lodash';
import moment from 'moment';
import '../style/index.css'
import '../less/index.less'

function component () {
    var element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello','webpack'], moment().format());

    return element;
}
  
document.body.appendChild(component());