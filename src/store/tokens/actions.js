import uniqid from 'uniqid'
import { ERC20_INTERFACE } from 'src/daos'
import { TokenModel, TokenDAOModel } from 'src/models'
import { daoByType } from 'src/store/daos/selectors'

export const TOKENS_REGISTER = 'tokens/register'

export const initTokens = () => async (dispatch, getState) => {

  const erc20LibrayDAO = daoByType('ERC20Library')(getState())

  const contracts = await erc20LibrayDAO.getContracts()

  const models = await Promise.all(
    contracts.map(
      async address => {
        const token = new TokenModel({
          key: uniqid(),
          address,
        })
        return TokenDAOModel.fromTokenModel(token, {
          getAbi: (/*address*/) => ERC20_INTERFACE.abi,
        })
      }
    )
  )

  for (const model of models) {
    dispatch({
      type: TOKENS_REGISTER,
      model,
    })
  }
}
