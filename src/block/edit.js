import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BlockEdit = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const { width } = attributes;

	const blockProps = useBlockProps({ style: { width, height: width } });

	const units = useSetting('spacing.units');

	return (
		<>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					className="single-column"
					hasValue={() => !!width}
					label={__('Width')}
					onDeselect={() => setAttributes({ width: undefined })}
					resetAllFilter={() => ({
						width: undefined,
					})}
					isShownByDefault
					panelId={clientId}
				>
					<UnitControl
						label={__('Width')}
						labelPosition="top"
						value={width || ''}
						min={0}
						onChange={(value) => setAttributes({ width: value })}
						units={units}
					/>
				</ToolsPanelItem>
			</InspectorControls>
			<div {...blockProps}>
				HI
			</div>
		</>
	);
};

export default BlockEdit;
