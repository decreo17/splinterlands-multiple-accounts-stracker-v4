import { getCardDetails } from "../api/cardsApi";
//import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const getMaxXp = (settings, details,edition,gold) => {
    let rarity = details.rarity;
    let tier = details.tier;
    
    if(edition == 4 || tier >= 4) {
        let rates=gold ? settings.combine_rates_gold[rarity - 1] : settings.combine_rates[rarity-1];
        
        return rates[rates.length-1]
    } else 
        return settings.xp_levels[rarity - 1][settings.xp_levels[rarity - 1].length - 1]
}

const calculateCP = (settings, card, details, base_only) => {
    if(!details) {
        details = getCardDetails(card.card_detail_id)
    }
    
    const isBaseOnly = base_only && base_only == true ? true : false;
    let alpha_bcx = 0, alpha_dec = 0;
    const alpha_xp = card.alpha_xp ? card.alpha_xp : 0;
    const xp = Math.max(card.xp-alpha_xp,0);
    let burn_rate = card.edition==4 || details.tier >= 4 ? settings.dec.untamed_burn_rate[details.rarity - 1] : settings.dec.burn_rate[details.rarity - 1];
    
    if(alpha_xp &&! isBaseOnly) {
        let alpha_bcx_xp = settings[card.gold ? "gold_xp":"alpha_xp"] [details.rarity - 1];
        alpha_bcx = Math.max(card.gold ? alpha_xp / alpha_bcx_xp : alpha_xp / alpha_bcx_xp,1);
        alpha_dec = burn_rate * alpha_bcx * settings.dec.alpha_burn_bonus;
        
        if(card.gold) alpha_dec *= settings.dec.gold_burn_bonus

    }
    
    const xp_property = card.edition == 0 || card.edition == 2 && details.id < 100 ? card.gold ? "gold_xp" : "alpha_xp" : card.gold ? "beta_gold_xp" : "beta_xp";
    const bcx_xp = settings[xp_property][details.rarity - 1];
    let bcx = Math.max(card.gold ? xp / bcx_xp : (xp + bcx_xp) / bcx_xp, 1);
    
    if(card.edition == 4 || details.tier >= 4) bcx = card.xp;
    
    if(alpha_xp) bcx--;
    
    let dec = isBaseOnly ? burn_rate : burn_rate * bcx;
    
    if(card.gold) {
        const gold_burn_bonus_prop = details.tier >= 7 ? "gold_burn_bonus_2" : "gold_burn_bonus";
        dec *= settings.dec[gold_burn_bonus_prop] 
    }
    
    if(card.edition == 0) dec *= settings.dec.alpha_burn_bonus;
    
    if(card.edition == 2 && (details.tier == null || details.tier == 3)) dec *= settings.dec.promo_burn_bonus;
    let total_dec = dec + alpha_dec;
    
    if(!isBaseOnly && card.xp >= getMaxXp(settings, details, card.edition, card.gold)) total_dec *= settings.dec.max_burn_bonus;
    
    if(details.tier >=7 )total_dec=total_dec / 2;
    
    return total_dec
}


export default calculateCP;