import _ from 'lodash';
import moment from 'moment';

function component () {
    var element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello','webpack'], moment().format());

    return element;
}
  
document.body.appendChild(component());