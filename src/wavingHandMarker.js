import L from 'leaflet';

const wavingHand = new L.Icon({
    iconUrl: require('./wave.png'),
    // shadowUrl: null,
    iconSize: [30, 30],
    // shadowSize: null,
    iconAnchor: [8, 8],
    // shadowAnchor: null,
    popupAnchor: [0, -10],
    className: 'stranger-marker'
});

export default wavingHand;