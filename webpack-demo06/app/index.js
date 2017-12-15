import _ from 'lodash';
import '../style/index.css'
import '../less/index.less'

function component () {
    var element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
}
  
document.body.appendChild(component());