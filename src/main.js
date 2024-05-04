/* set dot size (physical pixel size) */
let dpr = window.devicePixelRatio;
let root = document.documentElement;
root.style.setProperty("--var-dot", 1/dpr + "px");
let test0 = document.getElementById("test-0");
// test0.textContent = dpr;

let tree_itr = (p_itr) => {
	let index = [];
	/* root node */
	let p_read = {};
	p_read.tree = p_itr.tree;
	p_read.index = index;
	let result = p_itr.read(p_read);
	let p_node = {};
	p_node.index = index;
	p_node.val = result.val;
	p_itr.node.root(p_node);
	index.push(0);
	/* other node */
	while (true) {
		p_read.index = index;
		result = p_itr.read(p_read);
		/* move to next accessible node */
		if (result.end) {
			index.pop();
			/* no node left */
			if (index.length == 0) {
				return;
			}
			index[index.length-1]++;
		} else {
			p_node.index = index;
			p_node.val = result.val;
			/* first child */
			if (index[index.length-1] == 0) {
				p_itr.node.child(p_node);
			} else {
				p_itr.node.sibling(p_node);
			}
			index.push(0);
		}
	}
};
let show = (p_show) => {
	let create_content = (p_cont) => {
		let cont = document.createElement("div");
		cont.className = "content";
		let caret = document.createElement("span");
		caret.className = "caret";
		caret.textContent = ">";
		let name = document.createElement("span");
		name.className = "name";
		name.textContent = p_cont.name;
		let detail = document.createElement("span");
		detail.className = "detail";
		cont.append(caret, name, detail);
		return cont;
	};
	let p_itr = {};
	p_itr.tree = p_show.data;
	p_itr.read = p_show.read_name;
	p_itr.node = {};
	p_itr.node.root = (p_node) => {
		let p_cont = {};
		p_cont.name = p_node.val;
		let cont = create_content(p_cont);
		p_show.container.append(cont);
	};
	p_itr.node.sibling = (p_node) => {
		let parent = p_show.container;
		/* find the parent li node */
		for (let k_index = 0; k_index < p_node.index.length - 1; k_index++) {
			let ol = parent.children[1];
			parent = ol.children[p_node.index[k_index]];
		}
		/* the actual html parent element is the ol element */
		parent = parent.children[1];
		let li = document.createElement("li");
		let p_cont = {};
		p_cont.name = p_node.val;
		let cont = create_content(p_cont);
		li.append(cont);
		/* append becuase tree_itr is sequencial */
		parent.append(li);
	};
	p_itr.node.child = (p_node) => {
		let parent = p_show.container;
		/* find the parent li node */
		for (let k_index = 0; k_index < p_node.index.length - 1; k_index++) {
			let ol = parent.children[1];
			parent = ol.children[p_node.index[k_index]];
		}
		let ol = document.createElement("ol");
		let li = document.createElement("li");
		let p_cont = {};
		p_cont.name = p_node.val;
		let cont = create_content(p_cont);
		li.append(cont);
		ol.append(li);
		parent.append(ol);
	};
	tree_itr(p_itr);
};
let p_show = {};
p_show.data = [
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
p_show.read_name = (p_show) => {
	let ret = {};
	let node = p_show.tree;
	for (let k_index = 0; k_index < p_show.index.length; k_index++) {
		let c_index = p_show.index[k_index];
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
p_show.container = document.getElementById("test-tree-auto");
// show(param);