/* set dot size (physical pixel size) */
let dpr = window.devicePixelRatio;
let root = document.documentElement;
root.style.setProperty("--var-dot", 1/dpr + "px");
let test0 = document.getElementById("test-0");
// test0.textContent = dpr;

let tree_itr_deep = (param) => {
	let index = [];
	while (true) {
		let p_read = {};
		p_read.tree = param.tree;
		p_read.index = index;
		let result = param.read(p_read);
		/* move to next accessible node */
		if (result.end) {
			index.pop();
			/* no node left */
			if (index.length == 0) {
				return;
			}
			index[index.length-1]++;
		} else {
			let p_cb = {};
			p_cb.index = index;
			p_cb.val = result.val;
			param.cb(p_cb);
			index.push(0);
		}
	}
};
let show = (param) => {
	let p_itr = {};
	p_itr.tree = param.data;
	p_itr.read = param.read_name;
	p_itr.cb = (param) => {
		console.log(param.index, param.val);
	};
	tree_itr_deep(p_itr);
};
let param = {};
param.data = [
	"root name",
	[
		[
			"name 0",
			[
				[
					"name 0.0",
					[]
				], [
					"name 0.1",
					[]
				]
			]
		], [
			"name 1",
			[
				[
					"name 1.0",
					[]
				], [
					"name 1.1",
					[]
				], [
					"name 1.2",
					[]
				]
			]
		], [
			"name 2",
			[]
		]
	]
];
param.read_name = (param) => {
	let ret = {};
	let node = param.tree;
	for (let k_index = 0; k_index < param.index.length; k_index++) {
		let c_index = param.index[k_index];
		let sub = node[1];
		/* index out of boundary or subnode does not exist */
		if (c_index >= sub.length) {
			ret.end = true;
			return ret;
		}
		node = sub[c_index];
	}
	ret.end = false;
	ret.val = node[0];
	return ret;
};
// show(param);