/**
 * Plugin Name:       Phoca Restaurant Menu Block
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const attributes = props.attributes;
	const { header, menuType } = attributes;
	const blockProps = useBlockProps.save();

	const phMenuBox = 'phMenuBox phMenu' + menuType + 'Box';

	return (
		<div className={ phMenuBox }>
			<h2 className="phMenuHeader">{ header }</h2>
			<div { ...blockProps } className="phMenuGroupBox">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
