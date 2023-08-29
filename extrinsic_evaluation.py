import json
import numpy as np
import torch

from Lite2_3Pyramid.reproduce.utils import system_level_correlation
from Lite2_3Pyramid.reproduce.utils import summary_level_correlation
from Lite2_3Pyramid.metric.score import score


experiment = "sg4"
sxu = "smu"

def open_json_file(filename, sxu_name=None):
    with open(filename) as f:
        data_json = json.load(f)
        if sxu_name == "sgu":
            return data_json["data"]
        return data_json


def calc_corr_summary_and_system(results, golden, cross_validation=False):
    if cross_validation:

        fold_division = open_json_file('eval_interface/src/data/realsumm/fold_split.json')
        system_pearson_array = []
        system_spearman_array = []
        for key_fold, value_fold in fold_division.items():
            results_temp = {}
            golden_temp = {}
            print(value_fold)
            for key, value in results.items():
                results_temp[key] = {k: value[k] for k in [str(n) for n in value_fold] if k in value}
                # print(results_temp[key])
            for key, value in golden.items():
                golden_temp[key] = {k: value[k] for k in [str(n) for n in value_fold] if k in value}
                # print(golden_temp[key])

            system_pearson, system_spearman = system_level_correlation(golden_temp, results_temp)
            system_pearson_array.append(system_pearson)
            system_spearman_array.append(system_spearman)

        system_pearson = np.mean(system_pearson_array)
        system_spearman = np.mean(system_spearman_array)
    else:
        system_pearson, system_spearman = system_level_correlation(golden, results)

    summary_pearson, summary_spearman, pearson, spearman = summary_level_correlation(golden, results)

    print(f"Pearson mean: {np.mean(pearson)}")
    print(f"Pearson median: {np.median(pearson)}")
    print(f"Pearson outliers: {[index for index, item in enumerate(pearson) if item < -0.3]}")
    #plt.boxplot(pearson)
    #plt.show()
    print(f"Spearman mean: {np.mean(spearman)}")
    print(f"Spearman median: {np.median(spearman)}")
    print(f"Spearman outliers: {[index for index, item in enumerate(spearman) if item < -0.3]}")
    #plt.boxplot(spearman)
    #plt.show()

    return [system_pearson, system_spearman, summary_pearson, summary_spearman]


def nli_evaluation_from_paper(summarys, smus):
    if "D08" in summarys[0]['instance_id'] or "D09" in summarys[0]['instance_id']:
        sorted_smus = sorted(smus, key=lambda x: x['instance_id'])
        sorted_summaries = sorted(summarys, key=lambda x: x['instance_id'])
        all_sorted_summaries = [dict([('instance_id', d['instance_id'])] + sorted([(k, v) for k, v in d.items() if k != 'instance_id'])) for d in sorted_summaries]#[dict(sorted(d.items())) for d in sorted_summaries]
    else:
        all_sorted_summaries = summarys
        sorted_smus = smus
    outputDict = {}
    all_summarys = list(map(lambda x: [], range(len(all_sorted_summaries[0]) - 1)))
    all_sxus = []
    name_of_system = []
    for i, data in enumerate(all_sorted_summaries):
        for j, value in enumerate(data.items()):
            if "instance_id" in value[0]:
                # output_Temp = {'instance_id': value}
                # print(value)
                continue
            if i == 0:
                name_of_system.append(value[0])
            all_summarys[j - 1].append(value[1])
        all_sxus.append(sorted_smus[i][sxu + 's'])
    results = []
    for i in range(len(all_summarys)):
        print(f"System summary: {name_of_system[i]} ( {i + 1} / {len(all_summarys)} )")
        # outputTemp = {'instance_id': name_of_system[i]}
        scores = score(all_summarys[i], all_sxus, detail=True, device=torch.device("mps"))['l3c']
        # outputTemp['mean'] = scores[0]
        # outputTemp['all'] = scores[1]
        # print(score(all_summarys[0], all_sxus, detail=True)['l3c'])
        outputDict[name_of_system[i].replace('.summary', '')] = dict(
            zip([str(n) for n in range(len(scores[1]))], map(lambda x: x, scores[1])))

    return outputDict


def write_to_json(list_of_results, output_file):
    outputDict = []
    list_of_datasets = ['pyrxsum', 'realsumm', 'tac08', 'tac09']
    for i, result in enumerate(list_of_results):
        output_Temp = {'instance_id': list_of_datasets[i],
                       'pearson_system': result[0],
                       'spearman_system': result[1],
                       'pearson_summary': result[2],
                       'spearman_summary': result[3]
                       }
        outputDict.append(output_Temp)

    jsonString = json.dumps(outputDict)
    jsonFile = open(output_file, "w")
    jsonFile.write(jsonString)
    jsonFile.close()


def save_dict_to_json(outputDict, file_name):
    jsonString = json.dumps(outputDict)
    jsonFile = open(file_name, "w")
    jsonFile.write(jsonString)
    jsonFile.close()


def corr_evaluate_realsumm(load_data=False):
    print("REALSumm start!")

    if load_data:
        result_Dict = open_json_file('eval_interface/src/data/realsumm/realsumm-nli-score-smu' + experiment + '.json')
    else:
        result_Dict = nli_evaluate_data(open_json_file('eval_interface/src/data/realsumm/realsumm-system-summary.json'),
                                        open_json_file('eval_interface/src/data/realsumm/realsumm' + experiment + '.json', sxu))

        save_dict_to_json(result_Dict, 'eval_interface/src/data/realsumm/realsumm-nli-score-smu' + experiment + '.json')

    return calc_corr_summary_and_system(result_Dict,
                                        open_json_file(
                                            'eval_interface/src/data/realsumm/realsumm-golden-labels.json'))

    # return calc_corr_summary_and_system(open_json_file('eval_interface/src/data/realsumm/realsumm-nli-score-scu.json'),
    #                                     open_json_file(
    #                                         'eval_interface/src/data/realsumm/realsumm-golden-labels.json'))


def corr_evaluate_pyrxsum(load_data=False):
    print("PyrXSum start!")
    if load_data:
        result_Dict = open_json_file('eval_interface/src/data/pyrxsum/pyrxsum-nli-score-smu' + experiment + '.json')
    else:
        result_Dict = nli_evaluate_data(open_json_file('eval_interface/src/data/pyrxsum/pyrxsum-system-summary.json'),
                                        open_json_file('eval_interface/src/data/pyrxsum/pyrxsum' + experiment + '.json', sxu))

        save_dict_to_json(result_Dict, 'eval_interface/src/data/pyrxsum/pyrxsum-nli-score-smu' + experiment + '.json')

    return calc_corr_summary_and_system(result_Dict,
                                        open_json_file(
                                            'eval_interface/src/data/pyrxsum/pyrxsum-golden-labels.json'))

    # return calc_corr_summary_and_system(open_json_file('eval_interface/src/data/pyrxsum/pyrxsum-nli-score-scu.json'),
    #                                     open_json_file(
    #                                         'eval_interface/src/data/pyrxsum/pyrxsum-golden-labels.json'))

def corr_evaluate_tac08(load_data=False):
    print("tac08 start!")

    if load_data:
        result_Dict = open_json_file('eval_interface/src/data/tac08/tac08-nli-score-smu' + experiment + '.json')
    else:
        result_Dict = nli_evaluate_data(open_json_file('eval_interface/src/data/tac08/tac08-system-summary.json'),
                                        open_json_file('eval_interface/src/data/tac08/tac08' + experiment + '.json', sxu))

        save_dict_to_json(result_Dict, 'eval_interface/src/data/tac08/tac08-nli-score-smu' + experiment + '.json')

    return calc_corr_summary_and_system(result_Dict,
                                        open_json_file(
                                            'eval_interface/src/data/tac08/tac08-golden-labels.json'))

def corr_evaluate_tac09(load_data=False):
    print("tac09 start!")

    if load_data:
        result_Dict = open_json_file('eval_interface/src/data/tac09/tac09-nli-score-smu' + experiment + '.json')
    else:
        result_Dict = nli_evaluate_data(open_json_file('eval_interface/src/data/tac09/tac09-system-summary.json'),
                                        open_json_file('eval_interface/src/data/tac09/tac09' + experiment + '.json', sxu))

        save_dict_to_json(result_Dict, 'eval_interface/src/data/tac09/tac09-nli-score-smu' + experiment + '.json')

    return calc_corr_summary_and_system(result_Dict,
                                        open_json_file(
                                            'eval_interface/src/data/tac09/tac09-golden-labels.json'))



def nli_evaluate_data(summarys, smus):
    return nli_evaluation_from_paper(summarys, smus)


def corr_evaluation_datase():
    list_of_results = []

    list_of_results.append(corr_evaluate_pyrxsum())
    list_of_results.append(corr_evaluate_realsumm())
    list_of_results.append(corr_evaluate_tac08())
    list_of_results.append(corr_evaluate_tac09())

    write_to_json(list_of_results, 'data/extrinsic_evaluation' + experiment + '.json')#result_list, 'data/extrinsic_evaluation-smu-sg4-plus-v10.json')


def plot_results():
    return calc_corr_summary_and_system(open_json_file('eval_interface/src/data/pyrxsum/pyrxsum-nli-score-smu.json'),
                                        open_json_file(
                                            'eval_interface/src/data/pyrxsum/pyrxsum-golden-labels.json'))


if __name__ == '__main__':
    corr_evaluation_datase()
    #plot_results()
