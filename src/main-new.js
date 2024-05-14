let unpack = (c) => {
	let index = [];
	while (true) {
		let c_read = {};
		c_read.index = index;
		/* reached the end of current layer */
		if (c_read.end) {
			/* reached the end of root layer */
			if (index.length == 0) {
				return;
			}
			/* return to the upper layer */
			index.pop();
		} else {
			
		}
	}
};
let load = (c) => {

};
let store = (c) => {

};
let display = (c) => {

};