export let AdminPermission = {
  INVITE          : true,
  REMOVE          : true,
  VIEW            : true,
  PASSWORD_RESET  : true,
  ADD             : true,
  UPLOAD          : false,
  SWAP_ADMIN      : false                    
  }
  
export let TeamAdminPermission = {
  INVITE          : true,
  REMOVE          : true,
  VIEW            : true,
  PASSWORD_RESET  : true,
  ADD             : true,
  UPLOAD          : true,
  SWAP_ADMIN      : true    
  }
  
export let MemberPermission = {
  INVITE          : false,
  REMOVE          : false,
  VIEW            : false,
  PASSWORD_RESET  : true,
  ADD             : false,
  UPLOAD          : true,
  SWAP_ADMIN      : false    
  }