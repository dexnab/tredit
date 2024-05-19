/*
 * input
 * src: the source data structure
 * read: callback functions to read the source data structure
 * read.data: read data from a node
 * read.child: return a child of a node
 * output
 * result: the unpacked tree structure
 */
const unpack = (c) => {
	/*
	 * move pointer to the next accessible node
	 * input
	 * pointer: pointer to the current node
	 * pointer.base: node object/address in the source data structure
	 * pointer.node: node object/address in the result tree structure
	 * pointer.index: the index of the node in its parent
	 * parent: parent pointer stack
	 * read: same as `read` in `unpack`
	 * output
	 * pointer: pointer to the next accessible node
	 * exist: existence of the next accessible node
	 */
	const next = (c) => {
		/* try the first child */
		let c_rc = {};
		c_rc.base = c.pointer.base;
		c_rc.index = 0;
		c.read.child(c_rc);
		if (c_rc.exist) {
			/* move pointer to the first child just found */
			/* create child object in the node */
			c.pointer.node.child = [];
			c.pointer.node.child[0] = {};
			/* push pointer to the parent stack */
			c.parent.push(c.pointer);
			/* move pointer */
			c.pointer.base = c_rc.base;
			c.pointer.node = c.pointer.node.child[0];
			c.pointer.index = 0;
			/* finished: moved pointer to the next accessible node */
			c.exist = true;
			return;
		}
		while(true) {
			/* try the next sibling */
			/* use parent base */
			c_rc.base = c.parent[c.parent.length - 1].base;
			/* increase index: access the next sibling */
			c.pointer.index++;
			c_rc.index = c.pointer.index;
			c.read.child(c_rc);
			if (c_rc.exist) {
				/* move pointer to the next sibling just found */
				c.pointer.base = c_rc.base;
				c.pointer.node.child[index] = {};
				c.pointer.node = c.pointer.node.child[index];
				/* note: index has been already increased */
				/* finished: moved pointer to the next accessible node */
				c.exist = true;
				return;
			}
			/* move pointer back to the parent */
			/* this is the root node: no parent */
			if (parent.length == 0) {
				/* finished: cannot find the next accessible node */
				c.exist = false;
				return;
			}
			c.pointer = c.parent.pop();
			/* re-run the loop */
			/* pointer now points to the parent, so try the next sibling of the parent */
		}
	};
	c.result = {};
	/* start from the root node */
	let c_n = {};
	c_n.pointer = {};
	c_n.pointer.base = c.src;
	c_n.pointer.node = c.result;
	c_n.pointer.index = 0;
	c_n.parent = [];
	c_n.read = c.read;
	while (true) {
		/* read data */
		let c_rd = {};
		c_rd.base = c_n.pointer.base;
		c.read.data(c_rd);
		if (c_rd.exist) {
			/* add data to the node */
			c_n.pointer.node.data = c_rd.data;
		}
		/* no data or invaid data */
		else {
			c_n.pointer.node.invaid = true;
		}
		/* set parent pointer */
		if (c_n.parent.length != 0) {
			c_n.pointer.node.parent = c_n.parent[c_n.parent.length - 1].node;
		}
		/* move pointer to the next node */
		next(c_n);
		if (!c_n.exist) {
			/* finished */
			return;
		}
	}
};
const load = (c) => {
	let c_upk = {};
	c_upk.src = c.data;
	c_upk.read = {};
	/*
	 * input
	 * base: node object/address in the source data structure
	 * output
	 * data: data of this node, packed into an object
	 * exist: existance of data
	 */
	c_upk.read.data = (c) => {
		if (typeof(c.base[0]) === "string") {
			c.data = {};
			c.data.name = c.base[0];
			c.exist = true;
		}
		else {
			c.exist = false;
		}
	}
	/*
	 * input
	 * base: base of the parent node
	 * index: the index of the child node in its parent
	 * output
	 * base: base of the child node
	 * exist: existance of this child
	 */
	c_upk.read.child = (c) => {
		if (c.index < c.base[1].length) {
			c.base = c.base[1][c.index];
			c.exist = true;
		}
		else {
			c.exist = false;
		}
	}
	unpack(c_upk);
	c.tree = c_upk.result;
};
let store = (c) => {

};
const display = (c) => {
	let node = c.tree;
	while (true) {
		if ("child" in node) {

		}
		else {

		}
	}
};
let c_load = {};
c_load.data = [
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