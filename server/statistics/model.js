import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StatisticsSchema = new Schema({
	datasetid: {
		type: 'String'
	},
	recordid: {
		type: 'String'
	},
	fields: {
		m2_e_70_80: {
			type: 'Number'
		},
		shape_area: {
			type: 'Number'
		},
		objectid: {
			type: 'Number'
		},
		c_ens_moy: {
			type: 'Number'
		},
		c_cainsee: {
			type: 'Number'
		},
		n_sq_eb: {
			type: 'Number'
		},
		geo_point_2d: {
			type: [
				'Number'
			]
		},
		n_sq_eb_or: {
			type: 'Number'
		},
		shape_leng: {
			type: 'Number'
		},
		m2_e_in700: {
			type: 'Number'
		},
		m2_e_tot: {
			type: 'Number'
		},
		geo_shape: {
			type: {
				type: 'String'
			},
			coordinates: {
				type: [
					'Array'
				]
			}
		},
		m2_e_90_10: {
			type: 'Number'
		},
		m2_e_s1000: {
			type: 'Number'
		},
		m2_e_80_90: {
			type: 'Number'
		}
	},
	geometry: {
		type: {
			type: 'String'
		},
		coordinates: {
			type: [
				'Number'
			]
		}
	},
	record_timestamp: {
		type: 'Date'
	}
});

export default mongoose.model('Statistics', StatisticsSchema);