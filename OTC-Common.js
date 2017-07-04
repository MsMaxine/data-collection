/**
	 登录网站 登录http://www.scm.rgyy.com.cn:8002/ 

**/
/* 表格创建以及渲染封装 */
function extend() {
    var target; // 存储被扩展的目标对象
    // 存储实参的个数
    var len = arguments.length;
    // 如果没有传入实参，arguments对象的长度为0
    var i = 1;
    if (len === 0) {
        return;
    }

    target = arguments[0];

    if (len > 1) {
        // 遍历arguments上所有对象
        for (; i < len; i++) {
            // 枚举当前对象的所有属性
            for (var k in arguments[i]) {
                if (arguments[i].hasOwnProperty(k)) {
                    target[k] = arguments[i][k];
                }
            }
        }
    }

    return target;
}

Table.extend = function () {
    var target; // 存储被扩展的目标对象
    // 存储实参的个数
    var len = arguments.length;
    // 如果没有传入实参，arguments对象的长度为0
    var i = 1;
    if (len === 0) {
        return;
    }

    target = arguments[0];

    if (len > 1) {
        // 遍历arguments上所有对象
        for (; i < len; i++) {
            // 枚举当前对象的所有属性
            for (var k in arguments[i]) {
                if (arguments[i].hasOwnProperty(k)) {
                    target[k] = arguments[i][k];
                }
            }
        }
    }

    return target;
};

function Table(config) {
    // 1: 过滤无效参数
    // 如果config没有传参 或 类型不是对象就提前结束构造函数的执行
    if (!config || typeof config !== 'object') {
        return this;
    }
    // 2: 将用户的配置信息 存储在this（Table对象）上
    extend(this, config);
    // 3: 给this添加一个table属性，用来存储创建出来的table标签
    this.table = document.createElement('table');
    // 4: 如果用户指定了表格的样式
    this.tclass && (this.table.className = this.tclass);
}

Table.prototype = {
    renderHead: function () {
        var thead = document.createElement('thead'),
            tr = document.createElement('tr'),
            th;
        console.log(model);
        var i = 0, l = model.length;
        console.log(l);
        // var i = 0, l = this.model.length;
        // 1 遍历表格头模型model
        for (; i < l; i++) {
            // 2 创建列th
            th = document.createElement('th');
            // 3 指定当前列显示文本
            th.innerHTML = model[i];
            // th.innerHTML = this.model[i];
            // 4 将当前列添加到tr上
            tr.appendChild(th);
        }
        // 5 将tr添加到thead上
        thead.appendChild(tr);
        // 6 在将thead加到table
        this.table.appendChild(thead);
    },
    renderBody: function () {
        var tbody = document.createElement('tbody'),
            tr,
            td;

        var i = 0,
            l = this.data.length;

        var k,
            obj; // 临时存储遍历data上的每一个对象
        // 1 遍历data数据--每一行的数据
        for (; i < l; i++) {
            // 2 创建行
            tr = document.createElement('tr');
            // 3 将遍历到的当前对象赋值给obj，临时存储
            obj = this.data[i];

            // 4 枚举obj属性--每一列的数据
            for (k in obj) {
                // 5 创建列td
                td = document.createElement('td');
                // 6 指定当前列显示文本
                td.innerHTML = obj[k];
                // 7 将当前列添加到tr上
                tr.appendChild(td)
            }
            // 8 将tr添加到tbody上
            tbody.appendChild(tr);
        }
        // 9 将tbody添加到table标签上
        this.table.appendChild(tbody);
    },
    render: function () {			// 调用方法渲染表格	
        this.renderHead();
        this.renderBody();
        document.body.innerHTML = '';
        document.body.appendChild(this.table);
        document.body.style.backgroundColor = '#fff';
    }
};

function renderTable() {
    document.body.setAttribute('id', 'res');
    var data = tabArr,
        model = model; // 表头的模型 
    //创建表格
    var t = new Table({
        target: '#res',
        data: data,
        model: model
    });
    //渲染表格

    t.render();
}


/*定义变量 */
var model = [],
    tabArr = [];

function step1() {
    var tab = document.getElementsByTagName('table')[0],
        len = tab.rows.length;
    var modelData = tab.rows[0].cells;
    /*获取表头数据 */
    for (var i = 0; i < modelData.length; i++) {
        model.push(modelData[i].innerText);
    }
	console.log(model);
    //获取表格数据
    
    for (var i = 1; i < len-2; i++) {
    	var tabObj = {};
    	for(var j=0; j< modelData.length; j++){
    		tabObj["key_" + j] = tab.rows[i].cells[j].innerHTML;	
    	}

        tabArr.push(tabObj);
    }
    console.log(tabArr);

}

step1();

setTimeout( renderTable, 3000);
