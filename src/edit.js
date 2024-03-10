/**
 * Plugin Name:       Phoca Restaurant Menu Block
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	PanelBody,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import {
	InnerBlocks,
	useBlockProps,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { dispatch, select } from '@wordpress/data';
import './editor.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const ALLOWED_BLOCKS = [ 'phoca/phoca-restaurant-menu-groups-items-block' ];

	const { attributes, setAttributes } = props;
	const { header } = attributes;

	// Options
	const {
		menuType,
		hideImages,
		priceFormat,
		priceCurrencySymbol,
		priceDecimalSymbol,
		priceDecimals,
		priceThousandsSeparator,
		priceSuffix,
		pricePrefix,
		adminDisplayGroupDescription,
		adminDisplayItemDescription,
	} = attributes;

	const onAttributeChange = ( attribute, value ) => {
		let newAttributes = { ...attributes, [ attribute ]: value };
		setAttributes( newAttributes );

		// Set inherited attribute for child block
		const children = select( 'core/block-editor' ).getBlocksByClientId(
			props.clientId
		)[ 0 ].innerBlocks;

		// Build systematically the variable: from: priceDecimals to inheritedPriceDecimals
		let inheritedAttribute =
			'inherited' +
			attribute.charAt( 0 ).toUpperCase() +
			attribute.slice( 1 );

		const attributesToUpdate = {
			[ inheritedAttribute ]: value,
		};

		children.forEach( function ( child ) {
			dispatch( 'core/block-editor' ).updateBlockAttributes(
				child.clientId,
				attributesToUpdate
			);
		} );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( {
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	return (
		<div className="phMenuBoxMenu">
			<div { ...useBlockProps() }>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ attributes.alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<h4>
					{ __(
						'Phoca Restaurant Menu',
						'phoca-restaurant-menu-block'
					) }
				</h4>
			</div>

			<InspectorControls>
				<PanelBody
					title={ __(
						'Block Settings',
						'phoca-restaurant-menu-block'
					) }
				>
					<SelectControl
						label={ __(
							'Menu Type',
							'phoca-restaurant-menu-block'
						) }
						value={ menuType }
						options={ [
							{
								value: 'DailyMenu',
								label: __(
									'Daily Menu',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: 'WeeklyMenu',
								label: __(
									'Weekly Menu',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: 'BillOfFare',
								label: __(
									'Bill Of Fare',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: 'BeverageList',
								label: __(
									'Beverage List',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: 'WineList',
								label: __(
									'Wine List',
									'phoca-restaurant-menu-block'
								),
							},
						] }
						onChange={ ( newValue ) =>
							onAttributeChange( 'menuType', newValue )
						}
					/>

					<ToggleControl
						label={ __(
							'Hide Images',
							'phoca-restaurant-menu-block'
						) }
						checked={ hideImages }
						onChange={ ( newValue ) =>
							onAttributeChange( 'hideImages', newValue )
						}
					/>

					<SelectControl
						label={ __(
							'Price Format',
							'phoca-restaurant-menu-block'
						) }
						value={ priceFormat }
						options={ [
							{
								value: '1',
								label: __(
									'(Price) (Currency Symbol)',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: '2',
								label: __(
									'(Price)(Currency Symbol)',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: '3',
								label: __(
									'(Currency Symbol)(Price)',
									'phoca-restaurant-menu-block'
								),
							},
							{
								value: '4',
								label: __(
									'(Currency Symbol) (Price)',
									'phoca-restaurant-menu-block'
								),
							},
						] }
						onChange={ ( newValue ) =>
							onAttributeChange( 'priceFormat', newValue )
						}
					/>

					<TextControl
						label={ __(
							'Price Currency Symbol',
							'phoca-restaurant-menu-block'
						) }
						value={ priceCurrencySymbol }
						onChange={ ( newValue ) =>
							onAttributeChange( 'priceCurrencySymbol', newValue )
						}
					/>

					<TextControl
						label={ __(
							'Price Decimal Symbol',
							'phoca-restaurant-menu-block'
						) }
						value={ priceDecimalSymbol }
						onChange={ ( newValue ) =>
							onAttributeChange( 'priceDecimalSymbol', newValue )
						}
					/>

					<TextControl
						label={ __(
							'Price Decimals',
							'phoca-restaurant-menu-block'
						) }
						value={ priceDecimals }
						onChange={ ( newValue ) =>
							onAttributeChange( 'priceDecimals', newValue )
						}
					/>

					<TextControl
						label={ __(
							'Price Thousands Separator',
							'phoca-restaurant-menu-block'
						) }
						value={ priceThousandsSeparator }
						onChange={ ( newValue ) =>
							onAttributeChange(
								'priceThousandsSeparator',
								newValue
							)
						}
					/>

					<TextControl
						label={ __(
							'Price Suffix',
							'phoca-restaurant-menu-block'
						) }
						value={ priceSuffix }
						onChange={ ( newValue ) =>
							onAttributeChange( 'priceSuffix', newValue )
						}
					/>

					<TextControl
						label={ __(
							'Price Prefix',
							'phoca-restaurant-menu-block'
						) }
						value={ pricePrefix }
						onChange={ ( newValue ) =>
							onAttributeChange( 'pricePrefix', newValue )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls>
				<PanelBody
					title={ __(
						'Administration Settings',
						'phoca-restaurant-menu-block'
					) }
				>
					<ToggleControl
						label={ __(
							'Display Group Description',
							'phoca-restaurant-menu-block'
						) }
						checked={ adminDisplayGroupDescription }
						onChange={ ( newValue ) =>
							onAttributeChange(
								'adminDisplayGroupDescription',
								newValue
							)
						}
					/>

					<ToggleControl
						label={ __(
							'Display Item Description',
							'phoca-restaurant-menu-block'
						) }
						checked={ adminDisplayItemDescription }
						onChange={ ( newValue ) =>
							onAttributeChange(
								'adminDisplayItemDescription',
								newValue
							)
						}
					/>
				</PanelBody>
			</InspectorControls>

			<TextControl
				label={ __(
					'Header (Date, List)',
					'phoca-restaurant-menu-block'
				) }
				value={ header }
				onChange={ ( newName ) => setAttributes( { header: newName } ) }
			/>

			<div className="phMenuBoxGroupsItems">
				<div { ...blockProps }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</div>
		</div>
	);
}
