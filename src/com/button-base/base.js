import { h, Component } from 'preact/preact';

export default class ButtonBase extends Component {
	render(props,state) {
		if ( !props.hasOwnProperty('tabIndex') )
			props.tabIndex="0";

		if ( props.class )
			props.class = "button-base " + props.class;
		else
			props.class = "button-base";
			
		if ( props.onclick ) {
			// As long as you don't set the "keep focus" property //
			if ( !props.keepFocus ) {
				// Wrap onClick with a function that deselects current element //
				let oldClick = props.onclick;
				props.onclick = (e) => {
					oldClick(e);
					if ( typeof document.activeElement.blur !== "undefined" ) {
						document.activeElement.blur();
					}
					// SVG Elements on Internet Explorer have no blur() method, so call the parent's blur //
					else if ( document.activeElement.parentNode.blur ) {
						document.activeElement.parentNode.blur();
					}
				}
			}
			
			props.onkeydown = (e) => {
				if ( e.keyCode === 13 ) {
					props.onclick()
				}
			};
		}
			
		return (
			<div {...props} />
		);
	}
}
